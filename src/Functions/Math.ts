const remap = (value: number, low1: number, high1: number, low2: number, high2: number) => {
	return low2 + ((high2 - low2) * (value - low1)) / (high1 - low1);
};

const normalize = (value: number) => {
	return 0.0 + ((1.0 - 0.0) * (value + 1.0)) / (1.0 + 1.0);
};

export { remap, normalize };
