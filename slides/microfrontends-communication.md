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
