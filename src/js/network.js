// src/js/network.js
import { DataSet, Network } from 'vis-network/standalone/umd/vis-network.min.js';

export let nodes;
export let edges;
export let network;

export function initNetwork(containerId) {
  nodes = new DataSet([]);
  edges = new DataSet([]);
  const container = document.getElementById(containerId);
  const data = { nodes, edges };
  const options = {
    nodes: {
      shape: 'dot', size: 15,
      font: { size: 14, color: '#1e293b', face: 'Arial' },
      borderWidth: 2,
      shadow: { enabled: true, color: 'rgba(0,0,0,0.1)', size: 4 }
    },
    edges: {
      width: 2,
      color: { color: '#64748b', opacity: 0.6 },
      smooth: { type: 'continuous' },
      font: { size: 10, color: '#64748b' }
    },
    physics: {
      enabled: true,
      stabilization: { iterations: 100 },
      barnesHut: { gravitationalConstant: -8000, springConstant: 0.001, springLength: 200 }
    },
    interaction: { hover: true, tooltipDelay: 300 }
  };
  network = new Network(container, data, options);
}
