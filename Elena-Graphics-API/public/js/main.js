import { monthEnergy } from "./modules/monthEnergy.js"
import { yearlyEnergy } from "./modules/yearlyEnergy.js"
import { realtimeEnergy } from "./modules/realtimeEnergy.js"
import { hourlyEnergy } from "./modules/hourlyEnergy.js"
import { dailyEnergy } from "./modules/dailyEnergy.js"

window.onload = () => {
    hourlyEnergy()
    realtimeEnergy()
    monthEnergy()
    yearlyEnergy()
    dailyEnergy()
}