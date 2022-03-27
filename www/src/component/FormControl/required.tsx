export const required = (value: string) => {
  if (value) return undefined;
  return "Поле не может быть пустым";
};
