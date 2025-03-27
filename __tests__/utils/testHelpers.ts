export const createMockFormData = (file?: File) => {
    const formData = new FormData();
    if (file) {
        formData.append("image", file);
    }
    return formData;
};

export const createMockFile = (name = "test.png", type = "image/png") => {
    return new File(["mock-content"], name, { type });
};
