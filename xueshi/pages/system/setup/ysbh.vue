<template>
	<view class="main_content">
		<view class="content">
			<view class="title fz35">{{soft_name}}安卓版本使用规则</view>
			<view class="ys_content">
				<view>在您使用	{{soft_name}}服务的过程中，我们访问您的各项权限是为了向您提供服务、优化我们的服务以及保障您的帐号安全，具体使用规则如下：</view>
				<view>
					1、为了提供包括但不限于如下功能，我们需要访问您的相机权限：<br />
				<ul class="list1">
					<li>扫一扫</li>
					<li>拍照</li>
				</ul>
				</view>
				
				<view>
				2、为了提供包括但不限于如下功能，我们需要您的地址位置权限：<br />
				<ul class="list1">
					<li>获取地理位置</li>
				</ul>	
				</view>
				<view>
				我们会采用符合业界标准的安全防护措施来保护您的个人信息安全，避免遭到未经授权的访问、公开披露、使用、修改、损坏或者丢失。我们会努力各种合理的制度、技术、程序以及物理层面的措施来保护您的个人信息，包括但不限于防火墙、加密（例如SSL）、去标识化或者匿名化处理、访问控制措施等。</view>
				<view>
				
				您可以通过系统设置内关于学时的应用权限设置，逐项查看您上述个人信息的访问权限开启状态，并可以决定开户或者关闭这些权限。开户这些权限即代表您授权我们可以收集和使用这些个人信息来实现上述的功能，关闭这些权限即代表您取消了这些授权，则我们将不再继续收集和使用您的这些个人信息，也无法为您提供上更衣室与这些对应的功能。您关闭权限的决定不会影响些前基于您授权所进行的信息的处理。<br /></view>
				<view>
					您可以查看《<navigator url="./ys">学时隐私保护指引</navigator>》 以获得更多详细的隐私政策信息。
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style>
	.content .title{
		text-align: center;
		font-weight: bold;
		border-bottom: 0upx;
	}
	.ys_content{
		line-height: 45upx;
	}
	.ys_content view{
		margin-bottom: 30upx;
	}
	.ys_content ul{
		list-style-type: none;
		margin: 0upx;
		padding:0upx;
		margin-top: 20upx;
	}
	.list1 li{
		line-height: 45upx;
		margin-bottom: 10upx;
		padding-left: 30upx;
	}
</style>
