import { useState } from "react";
import { Header } from "@/components/menu/Header";
import { CategoryFilter } from "@/components/menu/CategoryFilter";
import { ProductGrid } from "@/components/menu/ProductGrid";
import { Cart } from "@/components/menu/Cart";
import { Checkout } from "@/components/menu/Checkout";
import { useCart } from "@/hooks/useCart";
import { NEIGHBORHOODS, DELIVERY_CONFIG } from "@/config/menuConfig";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCheckout, setShowCheckout] = useState(false);
  
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    totalItems,
  } = useCart();

  const handleCheckoutComplete = () => {
    clearCart();
    setShowCheckout(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Category Filter */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Products Grid */}
      <ProductGrid
        selectedCategory={selectedCategory}
        onAddProduct={addItem}
      />

      {/* Delivery Info Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container">
          <div className="text-center space-y-4">
            <h3 className="font-display text-lg text-primary">Bairros Atendidos</h3>
            <div className="flex flex-wrap justify-center gap-2">
              {NEIGHBORHOODS.map((n) => (
                <span
                  key={n.id}
                  className="px-3 py-1.5 text-xs rounded-full bg-secondary text-secondary-foreground"
                >
                  {n.name}
                </span>
              ))}
            </div>
            {DELIVERY_CONFIG.minimumOrderEnabled && (
              <p className="text-muted-foreground text-sm">
                Pedido mínimo:{" "}
                {DELIVERY_CONFIG.minimumOrder.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            )}
          </div>
        </div>
      </footer>

      {/* Cart */}
      <Cart
        items={items}
        subtotal={subtotal}
        totalItems={totalItems}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
        onCheckout={() => setShowCheckout(true)}
      />

      {/* Checkout Modal */}
      {showCheckout && (
        <Checkout
          items={items}
          subtotal={subtotal}
          onClose={() => setShowCheckout(false)}
          onComplete={handleCheckoutComplete}
        />
      )}
    </div>
  );
};

export default Index;
