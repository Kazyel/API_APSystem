let svg = document.getElementById('svg_logic');
let svg_physical = document.getElementById('svg_physical');
const svgContainer = document.getElementById("svgContainer");

let is_physic = true;
let isPanning = false;
let startPoint = { x: 0, y: 0 };
let endPoint = { x: 0, y: 0 };;
let scale = 1;

const panelWidth = 700
const panelHeight = 400

let viewBox = { x: -2000, y: 1000, w: 10000, h: 3000 };
svg_physical.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
const svgSize = { w: svg_physical.clientWidth, h: svg_physical.clientHeight };

// Manipulação do layout
svgContainer.onwheel = function (e) {
    e.preventDefault();

    let w = viewBox.w;
    let h = viewBox.h;
    let mx = e.offsetX;
    let my = e.offsetY;
    let dw = w * Math.sign(e.deltaY) * 0.05;
    let dh = h * Math.sign(e.deltaY) * 0.05;
    let dx = dw * mx / svgSize.w;
    let dy = dh * my / svgSize.h;

    viewBox = { x: viewBox.x - dx, y: viewBox.y - dy, w: viewBox.w + dw, h: viewBox.h + dh };
    scale = svgSize.w / viewBox.w;

    if (is_physic) {
        svg_physical.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
    } else {
        svg.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
    }
}

svgContainer.onmousedown = function (e) {
    isPanning = true;
    startPoint = { x: e.x, y: e.y };
    svg_physical.style.cursor = 'grabbing'
}

svgContainer.onmousemove = function (e) {
    if (isPanning) {
        endPoint = { x: e.x, y: e.y };
        let dx = (startPoint.x - endPoint.x) / scale;
        let dy = (startPoint.y - endPoint.y) / scale;
        let movedViewBox = { x: viewBox.x + dx, y: viewBox.y + dy, w: viewBox.w, h: viewBox.h };

        if (is_physic) {
            svg_physical.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
        } else {
            svg.setAttribute('viewBox', `${movedViewBox.x} ${movedViewBox.y} ${movedViewBox.w} ${movedViewBox.h}`);
        }
    }
}

svgContainer.onmouseup = function (e) {
    if (isPanning) {
        endPoint = { x: e.x, y: e.y };
        let dx = (startPoint.x - endPoint.x) / scale;
        let dy = (startPoint.y - endPoint.y) / scale;
        viewBox = { x: viewBox.x + dx, y: viewBox.y + dy, w: viewBox.w, h: viewBox.h };

        if (is_physic) {
            svg_physical.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
        } else {
            svg.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
        }

        isPanning = false;
    }

    svg_physical.style.cursor = 'grab'
}

svgContainer.onmouseleave = function (e) {
    isPanning = false;
    svg_physical.style.cursor = 'grab'
}

/*
    Essa funcionalidade é responsável por criar os elementos SVG que representam os painéis solares. A função createSolarPanel cria um retângulo que representa o painel solar.
*/
function createSolarPanel(x, y, color) {
    let solarPanel = document.createElementNS("http://www.w3.org/2000/svg", 'rect')

    solarPanel.setAttribute('width', panelWidth)
    solarPanel.setAttribute('height', panelHeight)
    solarPanel.setAttribute('fill', color)
    solarPanel.setAttribute('stroke', '#000000bb')
    solarPanel.setAttribute('stroke-width', 5)
    solarPanel.classList = 'solar-panel'
    solarPanel.style.cursor = 'pointer'

    solarPanel.setAttribute('x', x)
    solarPanel.setAttribute('y', y)

    return solarPanel
}

/*
    Essa funcionalidade é responsável por criar os elementos SVG que representam as labels de energia dos painéis solares. A função createEnergyLabel cria um texto que representa a quantidade de energia gerada pelo painel solar.
*/
function createEnergyLabel(x, y, energy, color) {
    let energyLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text')

    energyLabel.setAttribute('x', x + (panelWidth / 2))
    energyLabel.setAttribute('y', y + (panelHeight / 2 + 25))
    energyLabel.setAttribute('text-anchor', 'middle')
    energyLabel.setAttribute('fill', color)
    energyLabel.style.font = 'bold 5rem Open Sans'
    energyLabel.style.cursor = 'pointer'
    energyLabel.classList = 'energy-label'
    energyLabel.textContent = energy

    return energyLabel
}

/*
    Essa funcionalidade é responsável por criar os elementos SVG que representam as labels de pares dos painéis solares. A função createPanelPairLabel cria um texto que representa o par de painéis solares.
*/
function createPanelPairLabel(x, y, pairLabel, color) {
    let panelTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text')

    panelTitle.setAttribute('x', x + (panelWidth / 2))
    panelTitle.setAttribute('y', y + (panelHeight - 75))
    panelTitle.setAttribute('text-anchor', 'middle')
    panelTitle.setAttribute('fill', color)
    panelTitle.textContent = pairLabel
    panelTitle.style.font = 'bold 3rem Open Sans'
    panelTitle.style.cursor = 'pointer'
    panelTitle.classList = 'panel-title'

    return panelTitle
}

/*
    Essa funcionalidade é responsável por criar os elementos SVG que representam as labels de ID dos painéis solares. A função createPanelID cria um texto que representa o ID do painel solar.
*/
function createPanelID(x, y, id, color) {
    let panelId = document.createElementNS('http://www.w3.org/2000/svg', 'text')

    panelId.setAttribute('x', x + (panelWidth / 2))
    panelId.setAttribute('y', y + (panelHeight / 2 - 100))
    panelId.setAttribute('text-anchor', 'middle')
    panelId.setAttribute('fill', color)
    panelId.textContent = id
    panelId.style.font = 'bold 2.25rem Open Sans'
    panelId.classList = 'panel-id'

    return panelId
}


function createEmptyRect(width, height, x, y, strokeColor) {
    const rectElement = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rectElement.setAttribute('width', width);
    rectElement.setAttribute('height', height);
    rectElement.setAttribute('x', x);
    rectElement.setAttribute('y', y);
    rectElement.setAttribute('fill', 'none');
    rectElement.setAttribute('stroke', strokeColor);
    rectElement.setAttribute('stroke-width', 5);

    return rectElement;
}

function createEmptyTrapeze(pointsString, strokeColor) {
    const trapezeElement = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    trapezeElement.setAttribute('points', pointsString);
    trapezeElement.setAttribute('fill', 'none');
    trapezeElement.setAttribute('stroke', strokeColor);
    trapezeElement.setAttribute('stroke-width', 5);

    return trapezeElement;
}

/* 
    Essa funcionalidade é responsável por calcular a cor do painel solar com base na quantidade de energia gerada. A função getRGBColor calcula a cor do painel solar com base na quantidade de energia gerada.
*/
const getRGBColor = (energy) => {
    let energyValue = parseFloat(energy).toFixed(2)
    let maxEnergyValue = 5
    let energyPercentage = energyValue / maxEnergyValue * 100

    let maxColorValue = 255
    let blueValue = energyPercentage / 100 * maxColorValue + 40
    let greenValue = blueValue - 60

    return `rgba(10, ${greenValue}, ${blueValue}, .85)`
}

/*
    Essa funcionalidade é responsável por criar os elementos SVG que representam os painéis solares. A função createPanelGroup cria um grupo de painéis solares.
*/
function createPanelGroup(data, id) {
    let svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    svgGroup.setAttribute('id', id)

    let panelsToRender = []

    for (const entry in data) {
        panelsToRender.push({
            pairLabel: data[entry].id,
            id: data[entry].panels["panel-1"].id,
            pos: data[entry].panels["panel-1"],
            energy: data[entry].energy
        })

        panelsToRender.push({
            pairLabel: data[entry].id,
            id: data[entry].panels["panel-2"].id,
            pos: data[entry].panels["panel-2"],
            energy: data[entry].energy
        })
    }

    for (const panel in panelsToRender) {
        let solarPanelGroup = document.createElementNS("http://www.w3.org/2000/svg", 'g')
        let panelX = panelsToRender[panel].pos.x
        let panelY = panelsToRender[panel].pos.y
        let energy = `${parseFloat(panelsToRender[panel].energy).toFixed(2)} kWh`

        const solarPanel = createSolarPanel(panelX, panelY, getRGBColor(panelsToRender[panel].energy))
        const energyLabel = createEnergyLabel(panelX, panelY, energy, "white")
        const pairLabel = createPanelPairLabel(panelX, panelY, panelsToRender[panel].pairLabel, "white")
        const panelId = createPanelID(panelX, panelY, panelsToRender[panel].id, "white")

        solarPanelGroup.appendChild(solarPanel)
        solarPanelGroup.appendChild(energyLabel)
        solarPanelGroup.appendChild(pairLabel)
        solarPanelGroup.appendChild(panelId)

        svgGroup.appendChild(solarPanelGroup)
    }

    return svgGroup
}

/*
    Essa funcionalidade é responsável por fazer a requisição dos dados dos painéis solares. A função createPanels faz a requisição dos dados dos painéis solares.
*/
async function createPanels(url) {
    const dataFetch = await fetch(`api/panels/${url}`)

    if (!dataFetch.ok) {
        return console.error("Couldn't fetch panels.")
    }

    const data = await dataFetch.json()
    const panels = createPanelGroup(data, url)

    svg_physical.appendChild(panels)
    return panels
}

const createHomePanels = async () => {
    const panels = await createPanels('home-panels')

    if (panels === undefined) {
        return console.error('No panels found.')
    }

    const homeBase = createEmptyRect(panelWidth * 13.25, panelHeight * 12, -panelWidth * 2, 0, '#000000bb')
    const rightBase = createEmptyRect(panelWidth * 5.8, panelHeight * 12 + 50, panelWidth * 5.5, -50, '#000000bb')
    const leftBaseOne = createEmptyRect(panelWidth * 4.15, panelHeight * 11.75, panelWidth * 1.75, panelHeight / 2 - 100, '#000000bb')
    const leftBaseTwo = createEmptyRect(panelWidth * 3.75, panelHeight * 11.75, -panelWidth * 2, panelHeight / 2 - 100, '#000000bb')

    const rightInnerDetail = createEmptyRect(panelWidth * 0.9, panelHeight * 5, panelWidth * 6 - 70, panelHeight * 3, '#000000bb')
    const rightOuterDetail = createEmptyRect(panelWidth * 0.95, panelHeight * 5.15, panelWidth * 6 - 70, panelHeight * 3 - 25, '#000000bb')

    const line = createEmptyRect(panelWidth * 1.5, 1, panelWidth * 7 - 100, panelHeight * 6, '#000000bb')


    svg_physical.appendChild(homeBase)
    svg_physical.appendChild(rightBase)
    svg_physical.appendChild(leftBaseOne)
    svg_physical.appendChild(leftBaseTwo)
    svg_physical.appendChild(rightInnerDetail)
    svg_physical.appendChild(rightOuterDetail)
    svg_physical.appendChild(line)
}

window.addEventListener('DOMContentLoaded', () => {
    createPanels('laundry-panels')
    // createPanels('cabinet-panels')


    // createHomePanels()
    // createPanels('restaurant-panels')
})
