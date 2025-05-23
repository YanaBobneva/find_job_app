import { render, screen, fireEvent } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
  useSearchParams: () => new URLSearchParams(),
}));

vi.mock("~/date/experienceLevels", () => ({
  experienceLevels: [
    { id: "junior", name: "Junior" },
    { id: "middle", name: "Middle" },
    { id: "senior", name: "Senior" },
  ],
}));

vi.mock("~/app/_components/citySelector", () => ({
  CitySelector: ({ value, onChange }: any) => (
    <select
      data-testid="city-selector"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">Выберите город</option>
      <option value="Moscow">Москва</option>
      <option value="SPB">Санкт-Петербург</option>
    </select>
  ),
}));

import { Filters } from "~/app/_components/filters";

describe("Filters component", () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it("updates filter inputs and calls router.push on apply and reset", () => {
    render(<Filters />);

    // Проверяем начальное состояние
    expect(
      (screen.getByTestId("city-selector") as HTMLSelectElement).value,
    ).toBe("");
    expect(
      (screen.getByRole("combobox", { name: /опыт/i }) as HTMLSelectElement)
        .value,
    ).toBe("");
    expect(
      (screen.getByPlaceholderText("Например, дизайнер") as HTMLInputElement)
        .value,
    ).toBe("");

    // Изменяем фильтры
    fireEvent.change(screen.getByTestId("city-selector"), {
      target: { value: "Moscow" },
    });
    fireEvent.change(screen.getByRole("combobox", { name: /опыт/i }), {
      target: { value: "middle" },
    });
    fireEvent.change(screen.getByPlaceholderText("Например, дизайнер"), {
      target: { value: "frontend" },
    });

    // Нажимаем "Применить"
    fireEvent.click(screen.getByRole("button", { name: /применить/i }));

    // Проверяем, что push вызван (с любым URL — проверка строки в отдельном тесте)
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush.mock.calls?.[0]?.[0]).toMatch(/\?/);

    // Нажимаем "Сбросить фильтры"
    fireEvent.click(screen.getByRole("button", { name: /сбросить фильтры/i }));

    // Проверяем, что push вызван для сброса
    expect(mockPush).toHaveBeenCalledTimes(2);
    expect(mockPush.mock.calls?.[1]?.[0]).toBe("/");
  });
});
