"use client";

import { useEffect, useState, useMemo } from "react";
import { Check, ChevronsUpDown } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { cn } from "@/libs/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input";

import { useGetProducts } from "@/hooks/products/useGetProducts";
import { useDebounce } from "@/hooks/utils/useDebounce";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterText, setFilterText] = useState("")
  const debouncedSearchQuery = useDebounce({
    value: searchQuery,
    delay: 1000,
  });
  const [value, setValue] = useState("")
  const products = useGetProducts({
    searchQuery: debouncedSearchQuery,
  })
  const [chartData, setChartData] = useState([]);
  const [open, setOpen] = useState(false)

  const productsList = useMemo(() => {
    return products?.data?.map((product) => ({
      label: `${product.name}, ${product.shortName}, ${product.company.name}`,
      value: product.id
    }));
  }, [products.data])

  console.log(productsList)

  useEffect(() => {
    if (products.data) {
      const data = [];

      products?.data?.forEach((element, index) => {
        data.push({
          [`${element.name}`]: element.priceHistory?.at(-1)?.price
        })
        if (index < 3) {
          const priceHistory = element.priceHistory?.map((priceHistory) => ({
            name: new Date(priceHistory.date).toLocaleDateString(),
            price: priceHistory.price
          }));

          data.push(priceHistory);
        }
      });

      console.log(data);
  
      setChartData(data);
    }
  }, [products.data])

  useEffect(() => {
    if (filterText.length > 3 && filterText !== searchQuery) {
      setSearchQuery(filterText);
      products.refetch();
    }
  }, [filterText, products, searchQuery])

  if (products.isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[500px] justify-between"
            >
              {searchQuery
                ? productsList.find((product) => product.value === searchQuery)?.label
                : "Search product..."
              }
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[500px] p-0">
            <Command>
              <Input
                placeholder="Search product..."
                value={filterText}
                onChange={(event) => setFilterText(event.target.value)}
              />
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {productsList.map((product) => (
                  <CommandItem
                    key={product.value}
                    value={product.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === searchQuery ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === product.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {product.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <LineChart
          width={1168}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </div>
    </div>
  )
}
