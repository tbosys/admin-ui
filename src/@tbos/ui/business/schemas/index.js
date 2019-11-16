import BaseSchema from "./base.json";

export function loadSchema(Schema) {
  Schema.properties = Object.keys(Schema.properties)
    .map(propertyKey => {
      var property = Schema.properties[propertyKey];
      return {
        key: propertyKey,
        ...(BaseSchema.properties[propertyKey] ||
          BaseSchema.properties[property.extends || "___"] ||
          {}),
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

export function createSchema(name, columnArray) {
  var columns = {};

  columnArray.forEach(columnItem => {
    if (typeof columnItem == "string") {
      columns[columnItem] = { key: columnItem, extends: columnItem };
    } else if (columnItem.extends) {
      columns[columnItem.key] = {
        key: columnItem.key,
        title: columnItem.key[0].toUpperCase() + columnItem.key.substring(1),
        extends: columnItem.extends
      };
    } else {
      columns[columnItem.key] = {
        extends: "string",
        key: columnItem.key,
        title: columnItem.key[0].toUpperCase() + columnItem.key.substring(1)
      };
    }
  });

  return {
    key: name,
    api: "crm",
    title: name[0].toUpperCase() + name.substring(1),
    table: Object.keys(columns),
    sections: [
      {
        title: "Info",
        widths: [12, 6, 3],
        columns: Object.keys(columns).filter(key => key != "id")
      }
    ],
    properties: {
      ...columns
    }
  };
}

export function enrichSection({ schema, section, table, components = {} }) {
  if (table) section = { columns: schema.table };
  section.columns = section.columns.map(key => {
    var column = {
      ...schema.properties[key]
    };
    if (components && components[key]) column.component = components[key];

    return column;
  });
  if (table) return section.columns;
  return section;
}
