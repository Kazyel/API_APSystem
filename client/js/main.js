import { monthlyEnergy } from "./modules/monthly.js"
import { yearlyEnergy } from "./modules/yearly.js"
import { dailyPower } from "./modules/dailyPower.js"
import { hourlyEnergy } from "./modules/hourlyEnergy.js"

window.onload = () => {
    hourlyEnergy()
    dailyPower()
    monthlyEnergy()
    yearlyEnergy()
}