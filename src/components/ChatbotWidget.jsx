import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { allJewelryProducts } from "../data/Products";

const QUICK_ACTIONS = [
  "Find rings under ₦10,000",
  "Gift ideas",
  "Track my order",
  "Delivery info",
  "Care & sizing tips",
  "Talk to human",
];

const parsePrice = (value) => {
  if (value === null || value === undefined) return null;
  const parsed = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
};

const parseBudget = (text) => {
  const clean = text.toLowerCase();
  const match = clean.match(/(\d[\d,.]*)(k)?/i);
  if (!match) return null;
  let amount = Number(String(match[1]).replace(/,/g, ""));
  if (!Number.isFinite(amount) || amount <= 0) return null;
  if (match[2]) amount *= 1000;
  return amount;
};

const categoryFromText = (text) => {
  const t = text.toLowerCase();
  if (t.includes("ring")) return "Rings";
  if (t.includes("necklace")) return "Necklaces";
  if (t.includes("bracelet")) return "Bracelets";
  if (t.includes("earring")) return "Earrings";
  if (t.includes("anklet")) return "Anklets";
  if (t.includes("nose")) return "Nose Cuffs";
  return null;
};

const ChatbotWidget = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      text: "Hi ✨ I’m your Lumis shopping assistant. I can help with product picks, gift ideas, shipping info, and order help.",
      quickActions: QUICK_ACTIONS,
    },
  ]);

  const productsWithNumericPrice = useMemo(
    () =>
      allJewelryProducts
        .map((p) => ({ ...p, numericPrice: parsePrice(p.price) }))
        .filter((p) => p.numericPrice),
    []
  );

  const sendBotReply = (payload) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          sender: "bot",
          ...payload,
        },
      ]);
      setIsTyping(false);
    }, 350);
  };

  const pickProducts = ({ category, budget, limit = 3 }) => {
    let list = productsWithNumericPrice;
    if (category) list = list.filter((p) => p.category === category);
    if (budget) list = list.filter((p) => p.numericPrice <= budget);
    return list.sort((a, b) => a.numericPrice - b.numericPrice).slice(0, limit);
  };

  const getBotResponse = (rawText) => {
    const text = rawText.toLowerCase().trim();
    const budget = parseBudget(rawText);
    const category = categoryFromText(rawText);

    if (text.includes("track") || text.includes("order status") || text.includes("order")) {
      return {
        text: "You can track your payment/order status on our status page. Use your payment reference after checkout.",
        links: [{ label: "Go to Order Status", path: "/order-status" }],
      };
    }

    if (text.includes("delivery") || text.includes("shipping")) {
      return {
        text: "Delivery fee is based on your location and order details. We confirm exact shipping cost and timeline at checkout/support. For urgent delivery, please contact us directly.",
        quickActions: ["Talk to human", "Gift ideas"],
      };
    }

    if (text.includes("care") || text.includes("size") || text.includes("sizing")) {
      return {
        text: "Quick tip: keep jewelry dry, avoid perfume contact, and store pieces separately. For ring sizing, choose a comfortable snug fit (not tight). If unsure, contact us for sizing help.",
        quickActions: ["Talk to human", "Find rings under ₦10,000"],
      };
    }

    if (text.includes("human") || text.includes("agent") || text.includes("instagram") || text.includes("whatsapp")) {
      return {
        text: "Sure — here’s the fastest way to reach us directly:",
        links: [
          { label: "Contact Page", path: "/contact" },
          { label: "Instagram", path: "https://www.instagram.com/lumiscollectionn?igsh=MW5udDF5NDh2anM3dA==", external: true },
        ],
      };
    }

    if (text.includes("gift")) {
      const giftProducts = pickProducts({ budget: budget || 10000, limit: 3 });
      return {
        text: `Lovely choice 🎁 Here are gift-friendly picks${budget ? ` under ₦${budget.toLocaleString()}` : ""}:`,
        products: giftProducts,
        quickActions: ["Find rings under ₦10,000", "Talk to human"],
      };
    }

    if (category || text.includes("find") || text.includes("under")) {
      const list = pickProducts({ category, budget: budget || null, limit: 3 });
      if (!list.length) {
        return {
          text: "I couldn’t find a close match for that budget. Try a higher budget or another category.",
          quickActions: ["Find rings under ₦10,000", "Gift ideas"],
        };
      }

      return {
        text: `Here are some ${category ? category.toLowerCase() : "pieces"}${budget ? ` under ₦${budget.toLocaleString()}` : " you may like"}:`,
        products: list,
        quickActions: ["Gift ideas", "Delivery info"],
      };
    }

    if (["hi", "hello", "hey"].some((greet) => text.includes(greet))) {
      return {
        text: "Welcome 💎 Tell me what you’re looking for (category + budget), and I’ll suggest pieces quickly.",
        quickActions: QUICK_ACTIONS,
      };
    }

    return {
      text: "I can help with product discovery, gift ideas, delivery info, and order help. Try one of these:",
      quickActions: QUICK_ACTIONS,
    };
  };

  const handleSend = (textValue) => {
    const value = textValue.trim();
    if (!value) return;

    setMessages((prev) => [...prev, { id: Date.now(), sender: "user", text: value }]);
    setInput("");
    sendBotReply(getBotResponse(value));
  };

  return (
    <>
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 w-[92vw] max-w-sm z-[70]">
          <div className="rounded-2xl border border-[#e0c8ad] bg-[#fffaf5] shadow-[0_18px_45px_rgba(71,50,31,0.28)] overflow-hidden">
            <div className="px-4 py-3 bg-gradient-to-r from-[#e2c7a0] to-[#9a6f43] text-[#fff9f3] flex items-center justify-between">
              <div>
                <p className="font-semibold">Lumis Assistant</p>
                <p className="text-xs text-[#fff4e9]">Fast product & order help</p>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-xl leading-none">×</button>
            </div>

            <div className="h-96 overflow-y-auto px-3 py-3 space-y-3 bg-gradient-to-b from-[#fffaf5] to-[#f8ecde]">
              {messages.map((msg) => (
                <div key={msg.id} className={msg.sender === "user" ? "text-right" : "text-left"}>
                  <div
                    className={`inline-block max-w-[92%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-[#9a6f43] text-white"
                        : "bg-white text-[#44362a] border border-[#ebd7c2]"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {msg.products?.length > 0 && (
                    <div className="mt-2 space-y-2">
                      {msg.products.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => navigate(`/product/${p.id}`)}
                          className="w-full text-left bg-white border border-[#e7d3bd] rounded-xl p-2.5 hover:border-[#caa47b] transition-colors"
                        >
                          <p className="text-sm font-semibold text-[#3f3125]">{p.name}</p>
                          <p className="text-xs text-[#8e6b4a]">{p.category} • ₦{p.numericPrice.toLocaleString()}</p>
                        </button>
                      ))}
                    </div>
                  )}

                  {msg.links?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {msg.links.map((link) => (
                        <button
                          key={link.label}
                          onClick={() => {
                            if (link.external) window.open(link.path, "_blank", "noopener,noreferrer");
                            else navigate(link.path);
                          }}
                          className="text-xs bg-[#f6e7d4] text-[#6a4a2e] px-3 py-1.5 rounded-full border border-[#e1c7a8] hover:bg-[#edd8bf]"
                        >
                          {link.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {msg.quickActions?.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {msg.quickActions.map((action) => (
                        <button
                          key={action}
                          onClick={() => handleSend(action)}
                          className="text-xs bg-[#f6e7d4] text-[#6a4a2e] px-3 py-1.5 rounded-full border border-[#e1c7a8] hover:bg-[#edd8bf]"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && <p className="text-xs text-[#7e6a56]">Assistant is typing…</p>}
            </div>

            <div className="p-3 border-t border-[#ead7c3] bg-[#fffaf5] flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend(input)}
                placeholder="Ask: rings under 10k, delivery, track order..."
                className="flex-1 border border-[#e1c7a8] rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#c39364]"
              />
              <button
                onClick={() => handleSend(input)}
                className="bg-[#9a6f43] text-white px-4 rounded-xl hover:bg-[#7f5731]"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-4 sm:right-6 z-[70] h-14 w-14 rounded-full bg-gradient-to-br from-[#e2c7a0] to-[#9a6f43] text-white shadow-[0_14px_34px_rgba(63,44,28,0.34)] hover:scale-105 transition-transform flex items-center justify-center"
        aria-label="Toggle Lumis assistant"
        title="Chat with Lumis assistant"
      >
        <MessageCircle size={24} strokeWidth={2.2} />
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-[#fff3e5] border border-[#d9b58a]" />
      </button>
    </>
  );
};

export default ChatbotWidget;