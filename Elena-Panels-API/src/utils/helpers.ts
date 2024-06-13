import { JsonValue } from '@prisma/client/runtime/library';
import { prisma } from '../db.js';

/* 
Essa função faz uma busca no banco de dados para verificar se existe algum painel,
caso exista, ele pega o último painel cadastrado e retorna os dados do painel.

O painel é identificado pelo id_inv, que é o id do painel.
O painel é composto por dois painéis solares, panel-1 e panel-2.
Cada painel solar possui um id, x e y, que são as coordenadas do painel.
E por fim, a energia gerada pelo painel.
*/

export type Panels = {
    id: string;
    panelsAxes: {
        'panel-1': { x: number; y: number };
        'panel-2': { x: number; y: number };
    };
}[];

export const processPanelsData = async (panels: Panels) => {
    const panelsData = [];

    for (const panel in panels) {
        const panelObject = await prisma.restaurant_panels.findFirst({
            where: {
                id_inv: { contains: panels[panel].id },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        if (panelObject !== null) {
            panelsData.push({
                id: panelObject.id_inv,
                panels: {
                    'panel-1': {
                        id: panelObject.positions![
                            'panel-1' as keyof JsonValue
                        ],
                        x: panels[panel].panelsAxes['panel-1'].x,
                        y: panels[panel].panelsAxes['panel-1'].y,
                    },
                    'panel-2': {
                        id: panelObject.positions![
                            'panel-2' as keyof JsonValue
                        ],
                        x: panels[panel].panelsAxes['panel-2'].x,
                        y: panels[panel].panelsAxes['panel-2'].y,
                    },
                },
                energy: panelObject.energy,
            });
        }
    }

    return panelsData;
};
