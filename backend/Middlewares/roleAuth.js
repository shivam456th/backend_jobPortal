export roleAuth =(allowedRoles) => {
    return asnc (req, resizeBy, next)=>{
        try {
            const {role} = req.user;
            if(!role || !allowedRoles.includes(role)){
                throw new Error("Forbidden");
            }
            next();
        } catch(error){
            console.error(error.message);
            throw new Error("Unauthorized access");
        }
    };
};