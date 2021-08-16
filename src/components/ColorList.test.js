import React from 'react';
import { render, screen } from "@testing-library/react";
import ColorList from './ColorList';

const colorTestList = [
    {
        color: 'aliceblue',
        code: {hex: '#f0f8ff'},
        id: 1,
    },
    {
        color: 'limegreen',
        code: {hex: '#99ddbc'},
        id: 2,
    },
    {
        color: 'aqua',
        code: {hex: '#00ffff'},
        id: 3,
    },
    {
        color: "aquamarine",
        code: {hex: "#7fffd4"},
        id:  4,
    }
];

test("Renders an empty list of colors without errors", () => {

    render(<ColorList colors={[]} />);
    
});

test("Renders a list of colors without errors", () => {

    render(<ColorList colors={colorTestList} />);
    const colorList = screen.getAllByTestId('color');
    expect(colorList).toHaveLength(4);

});

test("Renders the EditForm when editing = true and does not render EditForm when editing = false", async () => {
    const { rerender } = render(<ColorList colors={colorTestList} editing={true} />);
    await (() => {
        const color = screen.getByText(/aqua/i);
        userEvent.click(color);
        const editColor = screen.queryAllByTestId('editMenu');
        expect(editColor).not.toBeNull;
        expect(editColor).toHaveLength(1);
        rerender(<ColorList colors={colorTestList} editing={false} />);
        const checkEditMenu = screen.queryAllByTestId('editMenu');
        expect(checkEditMenu).toHaveLength(0);
    })
});
