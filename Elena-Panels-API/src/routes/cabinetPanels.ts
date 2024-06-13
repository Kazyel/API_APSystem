import { FastifyInstance } from 'fastify';
import { cabinetPanels as panels } from '../utils/panels.js';
import { processPanelsData } from '../utils/helpers.js';

const cabinetPanels = (
    fastify: FastifyInstance,
    options: never,
    done: () => void
) => {
    fastify.get('/api/panels/cabinet-panels', async () => {
        return processPanelsData(panels);
    });

    done();
};

export default cabinetPanels;
