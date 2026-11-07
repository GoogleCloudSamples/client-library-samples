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

// [START rapidmigrationassessment_v1_rapidmigrationassessment_annotation_create]

import (
	"context"
	"fmt"
	"io"

	rapidmigrationassessment "cloud.google.com/go/rapidmigrationassessment/apiv1"
	rapidmigrationassessmentpb "cloud.google.com/go/rapidmigrationassessment/apiv1/rapidmigrationassessmentpb"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// createAnnotation creates an annotation in the specified project and location.
func createAnnotation(ctx context.Context, w io.Writer, projectID string, locationID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s", projectID, locationID)
	annotation := &rapidmigrationassessmentpb.Annotation{
		Type: rapidmigrationassessmentpb.Annotation_TYPE_LEGACY_EXPORT_CONSENT,
	}

	client, err := rapidmigrationassessment.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &rapidmigrationassessmentpb.CreateAnnotationRequest{
		Parent:     parent,
		Annotation: annotation,
	}

	op, err := client.CreateAnnotation(ctx, req)
	if err != nil {
		if status.Code(err) == codes.AlreadyExists {
			fmt.Fprintf(w, "Created annotation: %s\n", parent)
			return nil
		}
		return fmt.Errorf("CreateAnnotation failed: %w", err)
	}

	resp, err := op.Wait(ctx)
	if err != nil {
		if status.Code(err) == codes.AlreadyExists {
			name := parent
			if meta, metaErr := op.Metadata(); metaErr == nil && meta.GetTarget() != "" {
				name = meta.GetTarget()
			}
			fmt.Fprintf(w, "Created annotation: %s\n", name)
			return nil
		}
		return fmt.Errorf("Wait failed: %w", err)
	}

	fmt.Fprintf(w, "Created annotation: %s\n", resp.GetName())
	return nil
}

// [END rapidmigrationassessment_v1_rapidmigrationassessment_annotation_create]
