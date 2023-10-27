import { useRegisterModal } from "@/hooks/useRegisterModal";
import { act, renderHook } from "@testing-library/react";

describe("useRegisterModal", () => {
  it("should initialize with isOpen set to false", () => {
    const { result } = renderHook(() => useRegisterModal());

    expect(result.current.isOpen).toBe(false);
  });

  it("should open the modal when openModal is called", () => {
    const { result } = renderHook(() => useRegisterModal());

    act(() => {
      result.current.openModal();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it("should close the modal when closeModal is called", () => {
    const { result } = renderHook(() => useRegisterModal());

    act(() => {
      result.current.openModal();
      result.current.closeModal();
    });
    
    expect(result.current.isOpen).toBe(false);
  });
});