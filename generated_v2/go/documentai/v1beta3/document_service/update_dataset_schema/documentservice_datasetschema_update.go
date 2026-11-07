// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

// [START documentai_v1beta3_documentservice_datasetschema_update]

import (
	"context"
	"fmt"
	"io"

	documentai "cloud.google.com/go/documentai/apiv1beta3"
	"cloud.google.com/go/documentai/apiv1beta3/documentaipb"
	"google.golang.org/api/option"
	"google.golang.org/protobuf/types/known/fieldmaskpb"
)

// updateDatasetSchema updates the schema configuration for a Document AI dataset.
func updateDatasetSchema(ctx context.Context, w io.Writer, projectID string, locationID string, processorID string) error {
	endpoint := fmt.Sprintf("%s-documentai.googleapis.com:443", locationID)
	client, err := documentai.NewDocumentClient(ctx, option.WithEndpoint(endpoint))
	if err != nil {
		return fmt.Errorf("NewDocumentClient failed: %w", err)
	}
	defer client.Close()

	schemaName := fmt.Sprintf("projects/%s/locations/%s/processors/%s/dataset/datasetSchema", projectID, locationID, processorID)

	// Retrieve the existing schema to preserve root entity definitions.
	datasetSchema, err := client.GetDatasetSchema(ctx, &documentaipb.GetDatasetSchemaRequest{
		Name: schemaName,
	})
	if err != nil {
		datasetSchema = &documentaipb.DatasetSchema{
			Name: schemaName,
		}
	}

	if datasetSchema.DocumentSchema == nil {
		datasetSchema.DocumentSchema = &documentaipb.DocumentSchema{
			Description: "Updated document schema definition",
		}
	}

	property := &documentaipb.DocumentSchema_EntityType_Property{
		Name:           "invoice_id",
		DisplayName:    "Invoice ID",
		ValueType:      "invoice_id",
		OccurrenceType: documentaipb.DocumentSchema_EntityType_Property_OPTIONAL_MULTIPLE,
	}

	entityType := &documentaipb.DocumentSchema_EntityType{
		Name:        "invoice_id",
		DisplayName: "Invoice ID",
		BaseTypes:   []string{"string"},
	}

	if len(datasetSchema.DocumentSchema.EntityTypes) > 0 {
		var root *documentaipb.DocumentSchema_EntityType
		for _, et := range datasetSchema.DocumentSchema.EntityTypes {
			for _, bt := range et.GetBaseTypes() {
				if bt == "document" {
					root = et
					break
				}
			}
			if root != nil {
				break
			}
		}
		if root == nil {
			root = datasetSchema.DocumentSchema.EntityTypes[0]
		}

		hasProperty := false
		for _, p := range root.GetProperties() {
			if p.GetName() == property.GetName() {
				hasProperty = true
				break
			}
		}
		if !hasProperty {
			root.Properties = append(root.Properties, property)
		}

		hasEntityType := false
		for _, et := range datasetSchema.DocumentSchema.EntityTypes {
			if et.GetName() == entityType.GetName() {
				hasEntityType = true
				break
			}
		}
		if !hasEntityType {
			datasetSchema.DocumentSchema.EntityTypes = append(datasetSchema.DocumentSchema.EntityTypes, entityType)
		}
	} else {
		root := &documentaipb.DocumentSchema_EntityType{
			Name:        "root",
			DisplayName: "Root",
			BaseTypes:   []string{"document"},
			Properties:  []*documentaipb.DocumentSchema_EntityType_Property{property},
		}
		datasetSchema.DocumentSchema.EntityTypes = []*documentaipb.DocumentSchema_EntityType{root, entityType}
	}

	updateMask := &fieldmaskpb.FieldMask{
		Paths: []string{"document_schema"},
	}

	req := &documentaipb.UpdateDatasetSchemaRequest{
		DatasetSchema: datasetSchema,
		UpdateMask:    updateMask,
	}

	resp, err := client.UpdateDatasetSchema(ctx, req)
	if err != nil {
		return fmt.Errorf("UpdateDatasetSchema: %w", err)
	}

	fmt.Fprintf(w, "Updated dataset schema: %s\n", resp.GetName())
	return nil
}

// [END documentai_v1beta3_documentservice_datasetschema_update]
