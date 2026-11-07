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

// [START datacatalog_v1_datacatalog_tagtemplate_create]

import (
	"context"
	"fmt"
	"io"
	"os"
	"strings"

	datacatalog "cloud.google.com/go/datacatalog/apiv1"
	datacatalogpb "cloud.google.com/go/datacatalog/apiv1/datacatalogpb"
)

// createTagTemplate creates a Data Catalog tag template.
func createTagTemplate(ctx context.Context, w io.Writer, tagTemplateID string) error {
	projectID := os.Getenv("GOOGLE_CLOUD_PROJECT")
	if projectID == "" {
		projectID = "example-project-id"
	}
	location := os.Getenv("LOCATION_ID")
	if location == "" {
		location = "us-central1"
	}
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, location)

	fieldType := &datacatalogpb.FieldType{
		TypeDecl: &datacatalogpb.FieldType_PrimitiveType_{
			PrimitiveType: datacatalogpb.FieldType_STRING,
		},
	}

	tagTemplate := &datacatalogpb.TagTemplate{
		DisplayName: "Example Tag Template",
		Fields: map[string]*datacatalogpb.TagTemplateField{
			"source": {
				DisplayName: "Source",
				Type:        fieldType,
			},
		},
	}

	client, err := datacatalog.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("datacatalog.NewClient: %w", err)
	}
	defer client.Close()

	req := &datacatalogpb.CreateTagTemplateRequest{
		Parent:        parent,
		TagTemplateId: tagTemplateID,
		TagTemplate:   tagTemplate,
	}

	resp, err := client.CreateTagTemplate(ctx, req)
	if err != nil {
		// Handle projects where Data Catalog write operations are disabled due to migration to Dataplex.
		if strings.Contains(err.Error(), "Data Catalog deprecation") {
			fmt.Fprintf(w, "Data Catalog write operations are disabled due to deprecation: %s\n", parent)
			return nil
		}
		return fmt.Errorf("CreateTagTemplate: %w", err)
	}

	fmt.Fprintf(w, "Created tag template: %s\n", resp.GetName())

	return nil
}

// [END datacatalog_v1_datacatalog_tagtemplate_create]
