import { Search, X, Loader2 } from "lucide-react";
import Input from "../Input/Input";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  loading = false,
  onClear,
  className = "",
}) {
  return (
    <div className={className}>
      <Input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        leftIcon={<Search size={18} />}
        rightIcon={
          loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : value ? (
            <button
              type="button"
              onClick={onClear}
              className="transition hover:text-white"
            >
              <X size={18} />
            </button>
          ) : null
        }
      />
    </div>
  );
}