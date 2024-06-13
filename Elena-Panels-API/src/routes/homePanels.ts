import { FastifyInstance } from 'fastify';
import { homePanels as panels } from '../utils/panels.js';
import { processPanelsData } from '../utils/helpers.js';

const homePanels = (
    fastify: FastifyInstance,
    options: never,
    done: () => void
) => {
    fastify.get('/api/panels/home-panels', async (req, res) => {
        return processPanelsData(panels);
    });

    done();
};

export default homePanels;
