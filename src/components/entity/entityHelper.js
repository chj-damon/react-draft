export const getEntityStrategy = mutability => (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(
        character => {
            const entityKey = character.getEntity();
            if (entityKey === null) {
                return false;
            }
            return contentState.getEntity(entityKey).getMutability() === mutability;
        },
        callback
    )
}

export const styles = {
    root: {
        fontFamily: '\'Helvetica\', sans-serif',
        padding: 20,
        width: 600,
    },
    editor: {
        border: '1px solid #ccc',
        cursor: 'text',
        minHeight: 80,
        padding: 10,
    },
    button: {
        marginTop: 10,
        textAlign: 'center',
    },
    immutable: {
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        padding: '2px 0',
    },
    mutable: {
        backgroundColor: 'rgba(204, 204, 255, 1.0)',
        padding: '2px 0',
    },
    segmented: {
        backgroundColor: 'rgba(248, 222, 126, 1.0)',
        padding: '2px 0',
    }
};

export const getDecoratedStyle = (mutability) => {
    switch (mutability) {
        case 'IMMUTABLE': return styles.immutable;
        case 'MUTABLE': return styles.mutable;
        case 'SEGMENTED': return styles.segmented;
        default: return null;
    }
}