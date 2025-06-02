export const validateVersion = (version: string): boolean => {
    // validation for the version input "x.y.z"
    const versionPattern = /^\d+\.\d+(\.\d+)?$/;
    return versionPattern.test(version);
};
