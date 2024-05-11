let svg = document.getElementById('svg_logic');
let svg_physical = document.getElementById('svg_physical');
const svgContainer = document.getElementById("svgContainer");

let is_physic = true;
let isPanning = false;
let startPoint = { x: 0, y: 0 };
let endPoint = { x: 0, y: 0 };;
let scale = 1;

let viewBox = { x: -2000, y: 1600, w: 4000, h: 2700 };
svg_physical.setAttribute('viewBox', `${viewBox.x} ${viewBox.y} ${viewBox.w} ${viewBox.h}`);
const svgSize = { w: svg_physical.clientWidth, h: svg_physical.clientHeight };

// Manipulação do layout
svgContainer.onmousewheel = function (e) {
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

function createSolarPanel(increment, maxAmount, color) {
    let solarPanel = document.createElementNS("http://www.w3.org/2000/svg", 'rect')
    let offset = 450

    solarPanel.setAttribute('width', 400)
    solarPanel.setAttribute('height', 400)
    solarPanel.setAttribute('fill', color)
    solarPanel.setAttribute('stroke', 'black')
    solarPanel.setAttribute('stroke-width', 5)
    solarPanel.classList = 'solar-panel'
    solarPanel.style.cursor = 'pointer'

    if (increment < maxAmount / 2) {
        solarPanel.setAttribute('x', increment * offset)
        solarPanel.setAttribute('y', 0)
    } else {
        solarPanel.setAttribute('x', (((maxAmount - 1) - increment) * offset))
        solarPanel.setAttribute('y', offset)
    }

    return solarPanel
}

function createEnergyLabel(increment, maxAmount) {
    let energyLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text')

    let initial = 225
    let offset = 450

    energyLabel.setAttribute('text-anchor', 'middle')
    energyLabel.setAttribute('fill', 'white')
    energyLabel.textContent = '1 kW'
    energyLabel.style.font = 'bold 5.5rem Open Sans'
    energyLabel.style.cursor = 'pointer'
    energyLabel.classList = 'energy-label'

    if (increment < maxAmount / 2) {
        energyLabel.setAttribute('x', (increment * offset) + 200)
        energyLabel.setAttribute('y', initial)
    } else {
        energyLabel.setAttribute('x', (((maxAmount - 1) - increment) * offset + 200))
        energyLabel.setAttribute('y', initial + offset)
    }

    return energyLabel
}

function createPanelTitle(increment, maxAmount) {
    let panelTitle = document.createElementNS('http://www.w3.org/2000/svg', 'text')

    let initial = 350
    let offset = 450

    panelTitle.setAttribute('text-anchor', 'middle')
    panelTitle.setAttribute('fill', 'white')
    panelTitle.textContent = '3051243'
    panelTitle.style.font = 'bold 3.5rem Open Sans'
    panelTitle.style.cursor = 'pointer'
    panelTitle.classList = 'panel-title'

    if (increment < maxAmount / 2) {
        panelTitle.setAttribute('x', (increment * offset) + 200)
        panelTitle.setAttribute('y', initial)
    } else {
        panelTitle.setAttribute('x', (((maxAmount - 1) - increment) * offset + 200))
        panelTitle.setAttribute('y', initial + offset)
    }

    return panelTitle
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

function createPanelGroup(amount, id) {
    let svgGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g')
    svgGroup.setAttribute('id', id)

    for (let i = 0; i < amount; i++) {
        const colors = ['#B1C3E0', '#88A4D0', '#6A8DC4'];
        const index = Math.floor(Math.random() * colors.length);
        let color = colors[index];

        let solarPanelGroup = document.createElementNS("http://www.w3.org/2000/svg", 'g')

        const solarPanel = createSolarPanel(i, amount, color)
        const energyLabel = createEnergyLabel(i, amount)
        const panelTitle = createPanelTitle(i, amount)

        solarPanelGroup.appendChild(solarPanel)
        solarPanelGroup.appendChild(energyLabel)
        solarPanelGroup.appendChild(panelTitle)

        svgGroup.appendChild(solarPanelGroup)
    }

    return svgGroup
}

window.addEventListener('DOMContentLoaded', () => {
    const portaria = createPanelGroup(16, 'solar-group-1')

    const portariaBase = createEmptyRect(5000, 2000, -800, -550, 'black')
    const portariaEntrada = createEmptyRect(500, 1100, -1200, -100, 'black')
    const portariaTras = createEmptyTrapeze('4700 -100, 5000 1000, 4200 1000, 4200 -100', 'black')

    portaria.appendChild(portariaBase)
    portaria.appendChild(portariaEntrada)
    portaria.appendChild(portariaTras)

    svg_physical.appendChild(portaria)
})



