# Kommunikasjon

```typescript
events.triggerEvent('minProp:updated', { minPropId });
```

```typescript
export default {
    triggerEvent: (id: string, payload: any) => {
        window.dispatchEvent(new CustomEvent(id, {
            bubbles: true,
            detail: {
                payload: {
                    ...payload,
                    originator: 'min-mikrofrontend',
                },
            },
        }));
    },
};
```

Note:
new CustomEvent(id, payload)  
Gjelder stort sett dersom w-c skal hente data fra backend eller lignende  
NB: Kan bruke props til nød, jeg kommer tilbake til dette

