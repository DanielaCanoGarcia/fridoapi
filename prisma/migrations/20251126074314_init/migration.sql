-- CreateTable
CREATE TABLE "usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "apellido_pat" TEXT NOT NULL,
    "correo" TEXT NOT NULL,
    "rol" TEXT NOT NULL,
    "tipo_usuario" TEXT NOT NULL,
    "contraseña" TEXT NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "alumno" (
    "id_alumno" SERIAL NOT NULL,
    "id_usuario" INTEGER NOT NULL,
    "nombre_usuario" TEXT NOT NULL,
    "avatar_url" TEXT NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "alumno_pkey" PRIMARY KEY ("id_alumno")
);

-- CreateTable
CREATE TABLE "lecturas" (
    "id_lecturas" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "portada_url" TEXT NOT NULL,
    "nivel" TEXT NOT NULL,
    "posted_by" INTEGER NOT NULL,
    "creado_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lecturas_pkey" PRIMARY KEY ("id_lecturas")
);

-- CreateTable
CREATE TABLE "secciones" (
    "id_secciones" SERIAL NOT NULL,
    "id_lecturas" INTEGER NOT NULL,
    "texto" TEXT NOT NULL,
    "ilustracion_url" TEXT NOT NULL,
    "order_index" INTEGER NOT NULL,

    CONSTRAINT "secciones_pkey" PRIMARY KEY ("id_secciones")
);

-- CreateTable
CREATE TABLE "preguntas" (
    "id_pregunta" SERIAL NOT NULL,
    "id_lecturas" INTEGER NOT NULL,
    "pregunta" TEXT NOT NULL,
    "orden" INTEGER NOT NULL,

    CONSTRAINT "preguntas_pkey" PRIMARY KEY ("id_pregunta")
);

-- CreateTable
CREATE TABLE "opciones_respuesta" (
    "id_opcion" SERIAL NOT NULL,
    "id_pregunta" INTEGER NOT NULL,
    "opcion" TEXT NOT NULL,
    "es_correcta" BOOLEAN NOT NULL,

    CONSTRAINT "opciones_respuesta_pkey" PRIMARY KEY ("id_opcion")
);

-- CreateTable
CREATE TABLE "alumno_lectura" (
    "id_alumno_lectura" SERIAL NOT NULL,
    "id_alumno" INTEGER NOT NULL,
    "id_lectura" INTEGER NOT NULL,
    "iniciado_en" TIMESTAMP(3),
    "completado_en" TIMESTAMP(3),
    "completado" BOOLEAN NOT NULL DEFAULT false,
    "correctas" INTEGER NOT NULL DEFAULT 0,
    "total_preguntas" INTEGER NOT NULL DEFAULT 0,
    "comprension" DOUBLE PRECISION,

    CONSTRAINT "alumno_lectura_pkey" PRIMARY KEY ("id_alumno_lectura")
);

-- CreateTable
CREATE TABLE "respuestas_alumno" (
    "id_respuestas_alumno" SERIAL NOT NULL,
    "id_alumno_lectura" INTEGER NOT NULL,
    "id_pregunta" INTEGER NOT NULL,
    "id_opcion" INTEGER NOT NULL,
    "es_correcta" BOOLEAN NOT NULL,
    "respondido_en" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "respuestas_alumno_pkey" PRIMARY KEY ("id_respuestas_alumno")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_correo_key" ON "usuario"("correo");

-- CreateIndex
CREATE UNIQUE INDEX "alumno_nombre_usuario_key" ON "alumno"("nombre_usuario");

-- AddForeignKey
ALTER TABLE "alumno" ADD CONSTRAINT "alumno_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lecturas" ADD CONSTRAINT "lecturas_posted_by_fkey" FOREIGN KEY ("posted_by") REFERENCES "usuario"("id_usuario") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "secciones" ADD CONSTRAINT "secciones_id_lecturas_fkey" FOREIGN KEY ("id_lecturas") REFERENCES "lecturas"("id_lecturas") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "preguntas" ADD CONSTRAINT "preguntas_id_lecturas_fkey" FOREIGN KEY ("id_lecturas") REFERENCES "lecturas"("id_lecturas") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "opciones_respuesta" ADD CONSTRAINT "opciones_respuesta_id_pregunta_fkey" FOREIGN KEY ("id_pregunta") REFERENCES "preguntas"("id_pregunta") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alumno_lectura" ADD CONSTRAINT "alumno_lectura_id_alumno_fkey" FOREIGN KEY ("id_alumno") REFERENCES "alumno"("id_alumno") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "alumno_lectura" ADD CONSTRAINT "alumno_lectura_id_lectura_fkey" FOREIGN KEY ("id_lectura") REFERENCES "lecturas"("id_lecturas") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respuestas_alumno" ADD CONSTRAINT "respuestas_alumno_id_alumno_lectura_fkey" FOREIGN KEY ("id_alumno_lectura") REFERENCES "alumno_lectura"("id_alumno_lectura") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respuestas_alumno" ADD CONSTRAINT "respuestas_alumno_id_pregunta_fkey" FOREIGN KEY ("id_pregunta") REFERENCES "preguntas"("id_pregunta") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "respuestas_alumno" ADD CONSTRAINT "respuestas_alumno_id_opcion_fkey" FOREIGN KEY ("id_opcion") REFERENCES "opciones_respuesta"("id_opcion") ON DELETE RESTRICT ON UPDATE CASCADE;
