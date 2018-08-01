# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-06-27 11:58
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('texts', '0002_auto_20180122_0513'),
    ]

    operations = [
        migrations.CreateModel(
            name='UserAnnotationOperation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('operation', models.CharField(choices=[('A', 'Applied'), ('R', 'Removed')], max_length=1)),
                ('note', models.TextField(blank=True, null=True)),
                ('annotation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='texts.Annotation')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('witness', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='texts.Witness')),
            ],
        ),
        migrations.RemoveField(
            model_name='applieduserannotation',
            name='annotation',
        ),
        migrations.RemoveField(
            model_name='applieduserannotation',
            name='user',
        ),
        migrations.RemoveField(
            model_name='applieduserannotation',
            name='witness',
        ),
        migrations.DeleteModel(
            name='AppliedUserAnnotation',
        ),
    ]
