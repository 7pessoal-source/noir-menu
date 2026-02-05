import { Plus } from "lucide-react";
import { Product } from "@/types/menu";

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return price.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="gradient-gold-card rounded-xl border border-border p-4 card-hover flex flex-col h-full">
      {/* Product Info */}
      <div className="flex-1">
        <h3 className="font-display text-lg font-semibold text-foreground mb-1 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">
          {product.description}
        </p>
      </div>

      {/* Price & Add Button */}
      <div className="flex items-center justify-between mt-auto pt-3 border-t border-border/50">
        <span className="text-primary font-bold text-lg">
          {formatPrice(product.price)}
        </span>
        <button
          onClick={() => onAdd(product)}
          className="
            flex items-center gap-1.5 px-3 py-2 rounded-lg
            bg-primary text-primary-foreground
            text-sm font-medium
            btn-gold-hover
          "
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">Adicionar</span>
        </button>
      </div>
    </div>
  );
}