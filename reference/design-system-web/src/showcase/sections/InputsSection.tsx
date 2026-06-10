import React, { useState } from 'react';
import { Input, Text, Stack, PhIcon } from '@ds/index';
import { Preview } from '../Preview';

export function InputsSection() {
  const [val, setVal] = useState('');
  return (
    <Stack direction="vertical" gap={8}>
      <Preview label="Base" code={`<Input label="Nombre" placeholder="Ej: Ana García" />`}>
        <div className="max-w-xs">
          <Input label="Nombre" placeholder="Ej: Ana García" value={val} onChange={e => setVal(e.target.value)} />
        </div>
      </Preview>

      <Preview label="Con iconos" code={`<Input leftIcon={<PhIcon name="map-pin" />} placeholder="Zona" />\n<Input leftIcon={<PhIcon name="magnifying-glass" />} rightIcon={<PhIcon name="x-circle" />} placeholder="Buscar" />`}>
        <Stack direction="vertical" gap={3} className="max-w-xs">
          <Input label="Zona" leftIcon={<PhIcon name="map-pin" size={14} />} placeholder="Ej: Playa Grande" />
          <Input label="Buscar" leftIcon={<PhIcon name="magnifying-glass" size={14} />} rightIcon={<PhIcon name="x-circle" size={14} />} placeholder="Actividades, zonas..." />
          <Input label="Fecha" leftIcon={<PhIcon name="calendar-blank" size={14} />} type="date" />
        </Stack>
      </Preview>

      <Preview label="Con helper y error" code={`<Input label="Email" helper="Usamos esto solo para notificaciones" />\n<Input label="Teléfono" error="Número inválido" />`}>
        <Stack direction="vertical" gap={3} className="max-w-xs">
          <Input label="Email" placeholder="hola@ejemplo.com" helper="Solo para notificaciones importantes" />
          <Input label="Teléfono" placeholder="+54 9 223..." defaultValue="abc" error="Ingresá un número válido con código de área" />
        </Stack>
      </Preview>

      <Preview label="Formulario completo — Crear plan">
        <Stack direction="vertical" gap={3} className="max-w-sm p-4 bg-white rounded-xl border border-border">
          <Text variant="subheading">Nuevo plan</Text>
          <Input label="Título" placeholder="Ej: Surf en Playa Grande" leftIcon={<PhIcon name="pencil" size={14} />} />
          <Input label="Zona" placeholder="Ej: Playa Grande" leftIcon={<PhIcon name="map-pin" size={14} />} />
          <Input label="Fecha y hora" type="datetime-local" leftIcon={<PhIcon name="calendar" size={14} />} />
          <Input label="Descripción" placeholder="Contá de qué se trata..." />
        </Stack>
      </Preview>
    </Stack>
  );
}
