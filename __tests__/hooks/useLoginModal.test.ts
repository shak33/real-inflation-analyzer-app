import { useLoginModal } from "@/hooks/useLoginModal";
import { act, renderHook } from "@testing-library/react";

describe("useLoginModal", () => {
  it("should initialize with isOpen set to false", () => {
    const { result } = renderHook(() => useLoginModal());

    expect(result.current.isOpen).toBe(false);
  });

  it("should open the modal when openModal is called", () => {
    const { result } = renderHook(() => useLoginModal());

    act(() => {
      result.current.openModal();
    });

    expect(result.current.isOpen).toBe(true);
  });

  it("should close the modal when closeModal is called", () => {
    const { result } = renderHook(() => useLoginModal());

    act(() => {
      result.current.openModal();
      result.current.closeModal();
    });
    
    expect(result.current.isOpen).toBe(false);
  });
});