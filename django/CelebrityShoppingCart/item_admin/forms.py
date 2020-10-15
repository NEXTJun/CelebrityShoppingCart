from django import forms

class CheckItemUpdateForm(forms.Form):
    name = forms.CharField(max_length=20, required=False)
    price = forms.IntegerField(min_value=0, required=False)
    amount = forms.IntegerField(min_value=0, required=False)
