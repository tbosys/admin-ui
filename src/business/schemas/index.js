import BaseSchema from "./base.json";

export function loadSchema(Schema) {
  Schema.properties = Object.keys(Schema.properties)
    .map(propertyKey => {
      var property = Schema.properties[propertyKey];
      return {
        key: propertyKey,
        ...(BaseSchema.properties[propertyKey] || BaseSchema.properties[property.extends || "___"] || {}),
        ...property
      };
    })
    .reduce((obj, item) => {
      return {
        ...obj,
        [item["key"]]: item
      };
    }, {});
  return Schema;
}

export function enrichSections({ schema, components }) {
  return schema.sections.map(section => {
    return enrichSection({ schema, section, components });
  });
}

export function enrichSection({ schema, section, table, components = {} }) {
  if (table) section = { columns: schema.table };
  section.columns = section.columns.map(key => {
    var column = {
      ...schema.properties[key]
    };
    if (components && components[key]) column.render = components[key];

    return column;
  });
  if (table) return section.columns;
  return section;
}
