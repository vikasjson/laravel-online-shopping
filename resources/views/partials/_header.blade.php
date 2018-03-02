<header>
    <div class="mo_login">
            <a href="#"><i class="fa fa-unlock-alt"></i> Login</a>
            <a href="#"><i class="fa fa-user"></i> Signup</a>

        <div class="clearfix"></div>
    </div>
    <nav class="navbar navbar-top">
        <div class="container-fluid">
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li class="padding_li1" href="mailto:support@shoppre.com"><i class="fa fa-envelope icon_margen"></i>support@shoppre.com
                    </li>
                    <li class="padding_li2" href="tel:+91-80 4094 4077"><i class="fa fa-mobile icon_margen"></i>+91 80
                        4094 4077
                    </li>
                    <li><a href="#"><i
                                    class="fa fa-unlock-alt"></i> Login</a></li>
                    <li><a href="#"><i class="fa fa-user"></i>
                            Sign up</a></li>
                </ul>

            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
    <nav class="navbar navbar-default">
        <div class="container-fluid">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed nav-icon-right" data-toggle="collapse"
                        data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                {{--@if(Auth::guard('customer')->check())--}}
                {{--<button  class="nav-icon icon-size">--}}
                {{--{{Auth::guard('customer')->user()->name}}--}}
                {{--</button>--}}
                {{--@else--}}
                {{--<button class="nav-icon icon-size"><i class="fa fa-user-circle"></i></button>--}}
                {{--@endif--}}
                <a class="navbar-brand" href="{{route('home')}}">
                    <img src="https://myaccount.shoppre.com/img/logo.png" alt="Shoppre - Borderless Shipping From India">
                </a>
            </div>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="{{route('home')}}">Home</a></li>
                    <li class="hidden-sm hidden-md hidden-lg"><a href="#">About Shoppre</a></li>
                    <li><a href="#">Our Services</a></li>
                    <li><a href="#">Contact us</a></li>
                    {{--<li><a href="{{route('feedback.Index')}}">Feedback</a></li>--}}
                </ul>
            </div><!-- /.navbar-collapse -->
        </div><!-- /.container-fluid -->
    </nav>
</header>
