import { FastifyInstance } from 'fastify';
import { restaurantPanels as panels } from '../utils/panels.js';
import { processPanelsData } from '../utils/helpers.js';

const restaurantPanels = (
    fastify: FastifyInstance,
    options: never,
    done: () => void
) => {
    fastify.get('/api/panels/restaurant-panels', async (req, res) => {
        return processPanelsData(panels);
    });

    done();
};

export default restaurantPanels;
