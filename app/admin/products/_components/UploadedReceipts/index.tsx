import Image from "next/image"

interface UploadedReceiptsProps {
  receipts: string[];
  onChange: (value: string) => void;
  value: string;
}

import { cn } from "@/libs/utils";

export const UploadedReceipts = ({
  receipts,
  onChange,
  value,
} : UploadedReceiptsProps) => {
  return (
    <>
      {receipts.length === 0 ? (
        <div>No receipts found for selected date</div>
      ) : (
        <div className="flex gap-4">
          {receipts.map((receipt) => (
            <div
              className="flex gap-4 items-center cursor-pointer overflow-hidden"
              key={receipt}
              onClick={() => onChange(receipt)}
            >
              <div
                className={cn("w-20 h-20", value === receipt && "border-2 border-blue-500")}
              >
                <Image
                  src={receipt}
                  alt="receipt"
                  layout="responsive"
                  objectFit="cover"
                  width={150}
                  height={75}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}