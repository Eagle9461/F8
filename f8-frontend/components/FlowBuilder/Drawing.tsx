import React, { useState, useEffect, useCallback, useRef } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, MiniMap, Controls, useReactFlow, ReactFlowProvider} from 'reactflow';
import 'reactflow/dist/style.css';

import { Node, SourceNode } from "./Node"

import drawing from './drawing.module.scss';

const initBgColor = '#F5F1F7';

const connectionLineStyle = { stroke: '#f00' };
const snapGrid = [20, 20];
const nodeTypes = {
  mainSetNode: Node,
  sourceNode: SourceNode,
};

const defaultViewport = { x: 0, y: 0, zoom: 1.5 };

interface ReactFlowWrapper{
  initial_nodes:any,
  initial_edges:any,
  reactFlowWrapper:any,
  connectingNodeId:any,
  connectingHandleType:any,
}

const CustomNodeFlow:React.FC<ReactFlowWrapper> = ({reactFlowWrapper, connectingNodeId, connectingHandleType, initial_nodes, initial_edges}) => {

  const [nodes, setNodes, onNodesChange] = useNodesState(initial_nodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initial_edges);
  const { project } = useReactFlow();
  const [bgColor, setBgColor] = useState(initBgColor);
  
  let id = 100;
  const getId = () => `${id++}`;
  
  const onConnect = useCallback(
    (params:any) =>
      setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: '#f88' } }, eds)),
    []
  );
  const onConnectStart = useCallback((_:any, { nodeId, handleType }:{nodeId:any, handleType:any}) => {
    connectingNodeId.current = nodeId;
    connectingHandleType.current = handleType;
  }, []);

  const onConnectEnd = useCallback(
    (event:any) => {
      const targetIsPane = event.target.classList.contains('react-flow__pane');

      if (targetIsPane) {
        // we need to remove the wrapper bounds, in order to get the correct position
        const { top, left } = reactFlowWrapper.current.getBoundingClientRect();
        const id = getId();
        const newNode = {
          id,
          type:'mainSetNode',
          // we are removing the half of the node width (75) to center the new node
          position: project({ x: event.clientX - left - 75, y: event.clientY - top }),
          data: { label: `Node ${id}` },
        };

        setNodes((nds) => nds.concat(newNode));

        if(connectingHandleType.current == 'source'){
          setEdges((eds) => eds.concat({ 
            id, 
            source: connectingNodeId.current, 
            target: id, 
            style: { stroke: '#f88' },
            animated: true
          }));
        } else {
          console.log(connectingHandleType.current);
          setEdges((eds) => eds.concat({ 
            id, 
            source: id, 
            target: connectingNodeId.current, 
            style: { stroke: '#f88' },
            animated: true
          }));
        }
      }
    },
    [project]
  );
  return (    
    <div ref={reactFlowWrapper} className={drawing.drawing}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onConnectStart={onConnectStart}
            onConnectEnd={onConnectEnd}
            style={{ background: bgColor }}
            nodeTypes={nodeTypes}
            connectionLineStyle={connectionLineStyle}
            snapToGrid={true}
            // snapGrid={snapGrid}
            defaultViewport={defaultViewport}
            fitView
            attributionPosition="bottom-left"
            >
            <MiniMap
              // nodeStrokeColor={(n:any) => {
              //   if (n.type === 'input') return '#0041d0';
              //   if (n.type === 'mainSetNode') return bgColor;
              //   if (n.type === 'output') return '#ff0072';
              // }}
              nodeColor={(n) => {
                if (n.type === 'mainSetNode') return bgColor;
                return '#fff';
              }}
            />
            <Controls />
          </ReactFlow>
        </div>
  );
};
interface DrawingProps{
  nodes:any,
  edges:any
}
const Drawing:React.FC<DrawingProps> = ({nodes, edges}) => {
  const wrapper = useRef(null);
  const nodeid = useRef(null);
  const handleType = useRef(null);
  const data = {
    initial_nodes:nodes,
    initial_edges:edges,
    reactFlowWrapper:wrapper,
    connectingNodeId:nodeid,
    connectingHandleType:handleType,
  }
  return (
    <section>
      <ReactFlowProvider>
        <CustomNodeFlow {...data}/>
      </ReactFlowProvider>
    </section>
  );
}
export default Drawing;
