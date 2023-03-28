import BaseController from "./controller/BaseController";
import { APIGuard, handleGuards } from "./controller/guards/APIGuard";
import AuthorizationGuard from "./controller/guards/AuthorizationGuard";
import CreateGuard from "./controller/guards/CreateGuard";
import DeleteGuard from "./controller/guards/DeleteGuard";
import ReadGuard from "./controller/guards/ReadGuard";
import UpdateGuard from "./controller/guards/UpdateGuard";

const Guards = {
	APIGuard,
	handleGuards,
	AuthorizationGuard,
	CreateGuard,
	DeleteGuard,
	ReadGuard,
	UpdateGuard
};
const Controller = {
	BaseController,
	Guards
};

import ContentTypes from "./enums/ContentTypes";
import HttpMethods from "./enums/HttpMethods";
import HttpStatusCodes from "./enums/HttpStatusCodes";

const Enums = {
	ContentTypes,
	HttpMethods,
	HttpStatusCodes
};

import BaseManager from "./manager/BaseManager";

const Manager = {
	BaseManager
};

import {
	IsEmail,
	findMatchingRoute,
	getNotMatchingValueProperties,
	parseRouteParam
} from "./utils/utils";

const Utils = {
	IsEmail,
	findMatchingRoute,
	getNotMatchingValueProperties,
	parseRouteParam
};

import Validators from "./validators/Validators";
import Validator from "./validators/Validator";
import PropertyValidator from "./validators/PropertyValidator";

const PropertyValidators = {
	Validators,
	Validator,
	PropertyValidator
};

import APIConfig from "./APIConfig";
import APIControllerMethod from "./APIControllerMethod";
import APIError from "./APIError";
import APIIncomingMessage from "./APIIncomingMessage";
import APIRequestOptions from "./APIRequestOptions";
import APIResponse from "./APIResponse";
import ODataParser from "./ODataParser";
import Route from "./Route";
import { Right, canCreate, canRead, canUpdate, canDelete } from "./Right";

export {
	APIConfig,
	APIControllerMethod,
	APIError,
	APIIncomingMessage,
	APIRequestOptions,
	APIResponse,
	ODataParser,
	Route,
	Right,
	canCreate,
	canDelete,
	canRead,
	canUpdate,
	Controller,
	Enums,
	Manager,
	Utils,
	PropertyValidators
};
