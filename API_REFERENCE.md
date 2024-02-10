## ROUTES

### /users

## Create user

**URL** : `/api/users`

**Method** : POST

**Payload**
```json
{
	"name":"user",
	"email":"user@gmail.com",
	"password":"123"
}
```

## Update user

**URL** : `/api/users/${id}`

**Method** : PUT

**Route param**
- `id` refer to the user's id, that will be modify.

**Authorization** : Bearer : {{USER_TOKEN}}

**Payload**
```json
{
	"name":"user",
	"email":"user@gmail.com",
	"password":"1234",
	"current_password":"123"
}
```
you can update each filed individually, except for the `password`, which requires `current_password` field.

**API Response (200 OK)**

```json
{
	"message": "Usuário atualizado com sucesso!"
}
```

## Delete user

**URL** : `/api/users/${id}`

**Method** : DELETE

**Route param**
- `id` refer to the user's id, that will be deleted.

**API Response (200 OK)**

```json
{
	"message": "usuário deletado com sucesso!"
}
```
---
### /notes

## Create note

**URL** : `/api/notes/${user_id}`

**Method** : POST

**Route param**
- `user_id` refer to the user's id, whom note will be created.

**Payload**
```json
{
	"title":"title",
	"description":"description",
	"rating": 0,
	"tags": ["tag1","tag2"]
}
```
- `rating` value range from `0` to `5`.
- `tags` accepts, more than one tag.

## Show note

**URL** : `/api/notes/${id}`

**Method** : GET

**Route param**
- `id` refer to the note's id, which will be displayed.

**API Response (200 OK)**
```json
{
	"id": 1,
	"title": "title",
	"description": "description",
	"rating": 0,
	"user_id": 1,
	"created_at": "2024-02-01 00:19:35",
	"updated_at": "2024-02-01 00:19:35",
	"tags": [
		{
			"id": 1,
			"name": "tag1",
			"user_id": 1,
			"note_id": 1
		},
        {
			"id": 2,
			"name": "tag2",
			"user_id": 1,
			"note_id": 1
		}
	]
}

```

## Delete note

**URL** : `/api/notes/${id}`

**Method** : DELETE

**Route param**
- `id` refer to the note's id, which will be deleted.

## Index notes

**URL** : `/api/notes`

**Method** : GET

**Query params**
- `user_id` refer to user's id notes.
- `title` search note by title, with operator LIKE.
- `tags` search note by tags, more than one can be search, just split it by commas.

**Usage**
```http
/api/notes?user_id=1&title=ti&tags=tag1,tag2
```

**API response (200 OK)**
```json
{
	"notes": [
		{
			"id": 1,
			"title": "title",
			"description": "description",
			"rating": 0,
			"user_id": 1,
			"tags": [
				{
					"id": 1,
					"name": "tag1",
					"user_id": 1,
					"note_id": 1
				},
				{
					"id": 2,
					"name": "tag2",
					"user_id": 1,
					"note_id": 1
				}
			]
		}
	]
}
```
---
### /tags

## Index tags

**URL** : `/api/tags/${user_id}`

**Method** : GET

**Route param**
- `user_id` refer to the user's id, whom notes will be displayed.

**API response (200 OK)**
```json
{
	"userTags": [
		{
			"id": 1,
			"name": "tag1",
			"user_id": 1,
			"note_id": 1
		},
		{
			"id": 2,
			"name": "tag2",
			"user_id": 1,
			"note_id": 1
		}
	]
}
```