import type { $Enums } from "@prisma/client";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ChooseRole from "~/app/_components/choose-role/ChooseRole";

// Создаём подмену `updateUser`, которая просто логирует данные
const mockUser: {
  id: string;
  email: string;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
  role: $Enums.Role | null;
} = {
  id: "user123",
  email: "test@example.com",
  emailVerified: null,
  createdAt: new Date(),
  updatedAt: new Date(),
  role: null, // начальное значение
};

// Мокаем action
const mockUpdateUser = vi.fn(async (formData: FormData) => {
  const newRole = formData.get("role") as $Enums.Role;
  mockUser.role = newRole;
});

vi.mock("~/app/api/action/user", () => ({
  updateUser: (formData: FormData) => mockUpdateUser(formData),
}));

describe("ChooseRole", () => {
  it("updates role in mock user object after submit", async () => {
    render(<ChooseRole user={mockUser} />);

    console.log(screen.debug());

    const select = screen.getByRole("combobox");
    const button = screen.getByRole("button", { name: /сохранить/i });

    // Выбираем роль
    fireEvent.change(select, { target: { value: "SEEKER" } });

    // Отправляем форму
    fireEvent.click(button);

    // Проверяем, что вызвался мок
    expect(mockUpdateUser).toHaveBeenCalled();

    // Проверяем, что роль обновилась
    expect(mockUser.role).toBe("SEEKER");
  });
});
