import { FaUtensils, FaBus, FaShoppingCart, FaHome, FaMoneyBill } from "react-icons/fa"

export default function CategoryIcon({ category }) {

const icons = {
Food: <FaUtensils className="text-red-500" />,
Travel: <FaBus className="text-blue-500" />,
Shopping: <FaShoppingCart className="text-purple-500" />,
Rent: <FaHome className="text-green-500" />,
Bills: <FaMoneyBill className="text-yellow-500" />
}

return icons[category] || <FaMoneyBill />

}
