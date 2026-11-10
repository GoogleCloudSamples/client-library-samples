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

// [START tpu_v1_tpu_acceleratortype_get]

import (
	"context"
	"fmt"
	"io"

	tpu "cloud.google.com/go/tpu/apiv1"
	tpupb "cloud.google.com/go/tpu/apiv1/tpupb"
)

// getAcceleratorType gets details about a specific TPU accelerator type.
func getAcceleratorType(ctx context.Context, w io.Writer, projectID string, locationID string, acceleratorTypeID string) error {
	name := fmt.Sprintf("projects/%s/locations/%s/acceleratorTypes/%s", projectID, locationID, acceleratorTypeID)

	client, err := tpu.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient: %w", err)
	}
	defer client.Close()

	req := &tpupb.GetAcceleratorTypeRequest{
		Name: name,
	}

	resp, err := client.GetAcceleratorType(ctx, req)
	if err != nil {
		return fmt.Errorf("GetAcceleratorType: %w", err)
	}

	fmt.Fprintf(w, "Retrieved accelerator type: %s\n", resp.GetName())

	return nil
}

// [END tpu_v1_tpu_acceleratortype_get]
