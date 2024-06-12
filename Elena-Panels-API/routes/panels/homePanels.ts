import { FastifyInstance } from 'fastify';
import { prisma } from '../../index.js';
import { homePanels as panels } from '../../utils/panels.js';
import { JsonValue } from '@prisma/client/runtime/library';

const homePanels = (
    fastify: FastifyInstance,
    options: never,
    done: () => void
) => {
    fastify.get('/api/panels/home-panels', async (req, res) => {
        const panelsData = [];

        /* 
            Essa função faz uma busca no banco de dados para verificar se existe algum painel,
            caso exista, ele pega o último painel cadastrado e retorna os dados do painel.

            O painel é identificado pelo id_inv, que é o id do painel.
            O painel é composto por dois painéis solares, panel-1 e panel-2.
            Cada painel solar possui um id, x e y, que são as coordenadas do painel.
            E por fim, a energia gerada pelo painel.
        */

        for (const panel in panels) {
            const panelObject = await prisma.home_panels.findMany({
                where: {
                    id_inv: { contains: panels[panel].id },
                },
                orderBy: {
                    createdAt: 'desc',
                },
                take: 1,
            });

            if (panelObject[0] !== undefined) {
                panelsData.push({
                    id: panelObject[0].id_inv,
                    panels: {
                        'panel-1': {
                            id: panelObject[0].positions![
                                'panel-1' as keyof JsonValue
                            ],
                            x: panels[panel].panelsAxes['panel-1'].x,
                            y: panels[panel].panelsAxes['panel-1'].y,
                        },
                        'panel-2': {
                            id: panelObject[0].positions![
                                'panel-2' as keyof JsonValue
                            ],
                            x: panels[panel].panelsAxes['panel-2'].x,
                            y: panels[panel].panelsAxes['panel-2'].y,
                        },
                    },
                    energy: panelObject[0].energy,
                });
            }
        }

        return panelsData;
    });

    done();
};

export default homePanels;
