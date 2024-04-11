import winston from "winston";
/* debug, http, info, warning, error, fatal */

const customLevelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "red",
    warning: "yellow",
    info: "green",
    http: "green",
    debug: "green",
  },
};

/* 
debug, http, info, warning, error, fatal
implementar un logger para desarrollo y un logger para producción, el logger de desarrollo deberá loggear a partir del nivel debug, sólo en consola

Sin embargo, el logger del entorno productivo debería loggear sólo a partir de nivel info.
Además, el logger deberá enviar en un transporte de archivos a partir del nivel de error en un nombre “errors.log”
Agregar logs de valor alto en los puntos importantes de tu servidor (errores, advertencias, etc) y modificar los console.log() habituales que tenemos para que muestren todo a partir de winston.
Crear un endpoint /loggerTest que permita probar todos los logs */

const desarrolloLogger = winston.createLogger({
  levels: customLevelOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOptions.colors }),
        winston.format.simple()
      ),
    }),
  ],
});

const produccionLogger = winston.createLogger({
  levels: customLevelOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOptions.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      level: "error",
      filename: "./Errors.log",
      format: winston.format.simple(),
    }),
  ],
});

export const addLogger = (req, res, next) => {
  switch(process.env.NODE_ENV){
    case 'desarollo': 
      req.logger=desarrolloLogger; 
      break;
    case 'produccion': 
      req.logger=produccionLogger; 
      break;
    default: 
      throw new Error("entorno no existente");
  }
  next();
};