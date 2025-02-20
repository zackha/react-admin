---
layout: default
title: "The ReferenceInput Component"
---

# `<ReferenceInput>`

Use `<ReferenceInput>` for foreign-key values, for instance, to edit the `post_id` of a `comment` resource. 

![ReferenceInput](./img/reference-input.gif)

## Usage

The component expects a `source` and a `reference` attributes. For instance, to make the `post_id` for a `comment` editable:

```jsx
import { ReferenceInput } from 'react-admin';

<ReferenceInput source="post_id" reference="posts" />
```

This component fetches the related record (using `dataProvider.getMany()`) as well as possible choices (using `dataProvider.getList()` in the reference resource). 

`<ReferenceInput>` renders an [`<AutocompleteInput>`](./AutocompleteInput.md) to let the user select the related record.

You can tweak how this component fetches the possible values using the `page`, `perPage`, `sort`, and `filter` props.

## Props

| Prop               | Required | Type                                        | Default                          | Description                                                                              |
|--------------------|----------|---------------------------------------------|----------------------------------|------------------------------------------------------------------------------------------|
| `source`           | Required | `string`                                    | -                                | Name of the entity property to use for the input value                                   |
| `label`            | Optional | `string`                                    | -                                | Useful only when `ReferenceInput` is in a Filter array, the label is used as the Filter label.|
| `reference`        | Required | `string`                                    | ''                               | Name of the reference resource, e.g. 'posts'.                                            |
| `children`         | Optional | `ReactNode`                                 | `<AutocompleteInput />`          | The actual selection component                                                           |
| `filter`           | Optional | `Object`                                    | `{}`                             | Permanent filters to use for getting the suggestion list                                 |
| `page`             | Optional | `number`                                    | 1                                | The current page number                                                                  |
| `perPage`          | Optional | `number`                                    | 25                               | Number of suggestions to show                                                            |
| `sort`             | Optional | `{ field: String, order: 'ASC' or 'DESC' }` | `{ field: 'id', order: 'DESC' }` | How to order the list of suggestions                                                     |
| `enableGetChoices` | Optional | `({q: string}) => boolean`                  | `() => true`                     | Function taking the `filterValues` and returning a boolean to enable the `getList` call. |

**Note**: `<ReferenceInput>` doesn't accept the [common input props](./Inputs.md#common-input-props) (like `label`) ; it is the responsibility of the child component to apply them.

## `children`

By default, `<ReferenceInput>` renders an [`<AutocompleteInput>`](./AutocompleteInput.md) to let end users select the reference record.

You can pass a child component to customize the way the reference selector is displayed.

For instance, to customize the input label, set the `label` prop on the child component:

```jsx
import { ReferenceInput, AutocompleteInput } from 'react-admin';

<ReferenceInput source="post_id" reference="posts">
    <AutocompleteInput label="Post" />
</ReferenceInput>
```

You can also use [`<SelectInput>`](./SelectInput.md) or [`<RadioButtonGroupInput>`](./RadioButtonGroupInput.md) instead of [`<AutocompleteInput>`](./AutocompleteInput.md).

```jsx
import { ReferenceInput, SelectInput } from 'react-admin';

<ReferenceInput source="post_id" reference="posts">
    <SelectInput />
</ReferenceInput>
```

You can even use a component of your own as child, provided it detects a `ChoicesContext` is available and gets their choices from it.

The choices context value can be accessed with the [`useChoicesContext`](./useChoicesContext.md) hook.

## `enableGetChoices`

You can make the `getList()` call lazy by using the `enableGetChoices` prop. This prop should be a function that receives the `filterValues` as parameter and return a boolean. This can be useful when using an `AutocompleteInput` on a resource with a lot of data. The following example only starts fetching the options when the query has at least 2 characters:

```jsx
<ReferenceInput
     source="post_id"
     reference="posts"
     enableGetChoices={({ q }) => q.length >= 2} />
```

## `filter`

You can filter the query used to populate the possible values. Use the `filter` prop for that.

{% raw %}
```jsx
<ReferenceInput source="post_id" reference="posts" filter={{ is_published: true }} />
```
{% endraw %}

## `perPage`

By default, `<ReferenceInput>` fetches only the first 25 values. You can extend this limit by setting the `perPage` prop.

```jsx
<ReferenceInput source="post_id" reference="posts" perPage={100} />
```

## `reference`

The name of the reference resource. For instance, in a Post form, if you want to edit the post author, the reference should be "authors".

```jsx
<ReferenceInput source="author_id" reference="authors" />
```

`<ReferenceInput>` will use the reference resource `recordRepresentation` to display the selected record and the list of possible records.

## `sort`

By default, `<ReferenceInput>` orders the possible values by `id` desc. You can change this order by setting the `sort` prop (an object with `field` and `order` properties).

{% raw %}
```jsx
<ReferenceInput
    source="post_id"
    reference="posts"
    sort={{ field: 'title', order: 'ASC' }}
/>
```
{% endraw %}

## `source`

The name of the property in the record that contains the identifier of the selected record.

For instance, if a Post contains a reference to an author via an `author_id` property:

```json
{
    "id": 456,
    "title": "Hello world",
    "author_id": 12
}
```

Then to display a selector for the post author, you should call `<ReferenceInput>` as follows:

```jsx
<ReferenceInput source="author_id" reference="authors" />
```

## Performance 

Why does `<ReferenceInput>` use the `dataProvider.getMany()` method with a single value `[id]` instead of `dataProvider.getOne()` to fetch the record for the current value?

Because when there may be many `<ReferenceInput>` for the same resource in a form (for instance when inside an `<ArrayInput>`), so react-admin *aggregates* the calls to `dataProvider.getMany()` into a single one with `[id1, id2, ...]`.

This speeds up the UI and avoids hitting the API too much.
