import type { ReactNode } from "react";

type InputProps = {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  maxLength?: number;
};

export function Input({
  label,
  name,
  type = "text",
  required = true,
  defaultValue,
  placeholder,
  maxLength,
}: InputProps) {
  return (
    <label className="df-field">
      <span className="df-label">{label}</span>
      <input
        className="df-input"
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </label>
  );
}

type SelectProps = {
  label: string;
  name: string;
  defaultValue?: string;
  children: ReactNode;
};

export function SelectField({ label, name, defaultValue, children }: SelectProps) {
  return (
    <label className="df-field">
      <span className="df-label">{label}</span>
      <select className="df-select" name={name} defaultValue={defaultValue}>
        {children}
      </select>
    </label>
  );
}

export function Button({
  children,
  variant = "primary",
  type = "submit",
}: {
  children: ReactNode;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
}) {
  return <button className={`df-button df-button--${variant}`} type={type}>{children}</button>;
}

export function Badge({ children }: { children: ReactNode }) {
  return <span className="df-badge">{children}</span>;
}
