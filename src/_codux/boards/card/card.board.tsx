import React from 'react';
import { createBoard } from '@wixc3/react-board';
import { Card } from '../../../../components/ui/card';

export default createBoard({
    name: 'Card',
    Board: () => <Card />,
    isSnippet: true,
});
