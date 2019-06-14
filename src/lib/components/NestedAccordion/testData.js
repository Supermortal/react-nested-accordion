export const testData = new Map();

testData.set("root", [
    { label: "Test 0-1" },
    {
        label: "Test 0-2",
        isLeaf: true
    },
    { label: "Test 0-3" }
]);

testData.set("Test 0-1", [
    { label: "Test 0-1-1" },
    {
        label: "Test 0-1-2",
        isLeaf: true
    }
]);

testData.set("Test 0-3", [
    {
        label: "Test 0-3-1",
        isLeaf: true
    },
    {
        label: "Test 0-3-2",
        isLeaf: true
    },
    {
        label: "Test 0-3-3",
        isLeaf: true
    },
    {
        label: "Test 0-3-4",
        isLeaf: true
    }
]);

testData.set("Test 0-1-1", [
    {
        label: "Test 0-1-1-1",
        isLeaf: true
    },
    {
        label: "Test 0-1-1-2",
        isLeaf: true
    }
]);

export const testDataArray = [
    [
        { label: "Test 0-1" },
        { label: "Test 0-2" },
        { label: "Test 0-3" }
    ],
    [
        { label: "Test 0-1-1" },
        { label: "Test 0-1-2" }
    ]
];