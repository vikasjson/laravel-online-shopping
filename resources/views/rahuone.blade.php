<h2>Welcome to laravel</h2>

<table>
    <tr>
        <th>id</th>
        <th>name</th>
        <th>mobile</th>
    </tr>
    @foreach($data as $l)

    <tr>
        <td>{{$l->name}}</td>
        <td>{{$l->email}}</td>
        <td>{{$l->mobile}}</td>
    </tr>
    @endforeach
</table>