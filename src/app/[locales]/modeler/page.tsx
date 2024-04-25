'use client';
import React, { useEffect, useRef } from 'react';
import BpmnModeler from 'bpmn-js/lib/Modeler';
import camundaModdlePackage from "camunda-bpmn-moddle/resources/camunda";
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-embedded.css";

import BpmnEmpty from '@/lib/modeler/empty-bpmn.bpmn';

export default function BpmnEditor() {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const bpmnModeler = useRef<BpmnModeler | null>(null);

    useEffect(() => {
        if (containerRef.current) {
            bpmnModeler.current = new BpmnModeler({
                container: containerRef.current,
                keyboard: {
                    bindTo: document
                },
                moddleExtensions: {
                    camunda: camundaModdlePackage
                },
            });

            bpmnModeler.current.importXML(BpmnEmpty).then(() => {
                if (bpmnModeler.current) {
                    const canvas = bpmnModeler.current.get("canvas") as any;
                    const elementFactory = bpmnModeler.current.get("elementFactory") as any;

                    canvas.zoom("fit-viewport");

                    if (elementFactory && elementFactory?.createBpmnElement) {
                        var task = elementFactory.createBpmnElement("shape", {
                            type: "bpmn:Task",
                            x: 350,
                            y: 100
                        });

                        var root = canvas.getRootElement();

                        canvas.addShape(task, root);
                    }
                }
            }).catch((err) => {
                if (err) {
                    console.error(err);
                }
            });
        }

        return () => {
            bpmnModeler.current?.destroy();
        };
    }, []);

    return <div>
        <div ref={containerRef} style={{ height: '100vh'}} />
    </div>;
};
