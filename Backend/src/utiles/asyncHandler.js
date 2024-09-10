const asyncHandler = (fn) => async (req, res, next) => {
        try {
            await fn();
        } catch (error) {
            // console.error(error);
            res.status(error.code || 500).json({
                success: false,
                message: error.message,
            });
        }
}

export { asyncHandler }