import { FastifyInstance } from 'fastify';
import { laundryPanels as panels } from '../utils/panels.js';
import { processPanelsData } from '../utils/helpers.js';

const laundryPanels = (
    fastify: FastifyInstance,
    options: never,
    done: () => void
) => {
    fastify.get('/api/panels/laundry-panels', async (req, res) => {
        return processPanelsData(panels);
    });

    done();
};

export default laundryPanels;
