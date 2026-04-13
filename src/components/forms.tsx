export const Input = ({ label, name, type = "text", required = true }: { label: string; name: string; type?: string; required?: boolean }) => (
  <label>
    <div>{label}</div>
    <input name={name} type={type} required={required} />
  </label>
);
